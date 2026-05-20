import * as React from "react";
import type { AvatarUploadState } from "@/features/users/types/userProfile.types";
import {
  readAvatarFile,
  validateAvatarFile,
} from "@/features/users/utils/avatarFile";

type UseAvatarUploadParams = {
  canEdit: boolean;
  onSelected: (avatar: AvatarUploadState) => void;
};

export function useAvatarUpload({
  canEdit,
  onSelected,
}: UseAvatarUploadParams) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragDepthRef = React.useRef(0);

  const processFile = React.useCallback(
    (file: File) => {
      const validationError = validateAvatarFile(file);
      if (validationError) {
        setUploadError(validationError);
        return;
      }
      setUploadError(null);
      readAvatarFile(file, onSelected);
    },
    [onSelected],
  );

  const openFileDialog = React.useCallback(() => {
    if (!canEdit) return;
    setUploadError(null);
    fileInputRef.current?.click();
  }, [canEdit]);

  const handleFileChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      processFile(file);
    },
    [processFile],
  );

  const handleDragEnter = React.useCallback(
    (event: React.DragEvent) => {
      if (!canEdit) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepthRef.current += 1;
      setIsDragging(true);
    },
    [canEdit],
  );

  const handleDragLeave = React.useCallback(
    (event: React.DragEvent) => {
      if (!canEdit) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepthRef.current -= 1;
      if (dragDepthRef.current <= 0) {
        dragDepthRef.current = 0;
        setIsDragging(false);
      }
    },
    [canEdit],
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent) => {
      if (!canEdit) return;
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    },
    [canEdit],
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent) => {
      if (!canEdit) return;
      event.preventDefault();
      event.stopPropagation();
      dragDepthRef.current = 0;
      setIsDragging(false);
      setUploadError(null);
      const file = event.dataTransfer.files?.[0];
      if (!file) return;
      processFile(file);
    },
    [canEdit, processFile],
  );

  return {
    fileInputRef,
    uploadError,
    isDragging,
    openFileDialog,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}
