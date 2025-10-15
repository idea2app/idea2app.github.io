import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { FC, useContext, useEffect, useState } from 'react';

import {
  PrototypeVersion,
  PrototypeVersionModel,
  PrototypeVersionStatus,
} from '../../models/PrototypeVersion';
import { I18nContext } from '../../models/Translation';

interface PrototypeGeneratorToolbarProps {
  projectId: number;
  messageId: number;
}

export const PrototypeGeneratorToolbar: FC<PrototypeGeneratorToolbarProps> = observer(
  ({ projectId, messageId }) => {
    const { t } = useContext(I18nContext);
    const [versionStore] = useState(() => new PrototypeVersionModel(projectId));
    const [version, setVersion] = useState<PrototypeVersion | null>(null);
    const [isPolling, setIsPolling] = useState(false);

    useEffect(() => {
      // Load existing version on mount
      loadVersion();
    }, [messageId]);

    useEffect(() => {
      // Start polling if status is generating
      if (version?.status === PrototypeVersionStatus.GENERATING) {
        startPolling();
      }

      return () => {
        setIsPolling(false);
      };
    }, [version?.status]);

    const loadVersion = async () => {
      const existingVersion = await versionStore.getVersionByMessageId(messageId);
      setVersion(existingVersion);
    };

    const startPolling = () => {
      if (isPolling) return;
      setIsPolling(true);

      const pollInterval = setInterval(async () => {
        const updatedVersion = await versionStore.getVersionByMessageId(messageId);
        setVersion(updatedVersion);

        if (
          updatedVersion?.status === PrototypeVersionStatus.COMPLETED ||
          updatedVersion?.status === PrototypeVersionStatus.FAILED
        ) {
          setIsPolling(false);
          clearInterval(pollInterval);
        }
      }, 3000); // Poll every 3 seconds

      // Cleanup after 5 minutes
      setTimeout(() => {
        setIsPolling(false);
        clearInterval(pollInterval);
      }, 300000);
    };

    const handleGenerateClick = async () => {
      try {
        const newVersion = await versionStore.createVersion(messageId);
        if (newVersion) {
          setVersion(newVersion);
          if (newVersion.status === PrototypeVersionStatus.GENERATING) {
            startPolling();
          }
        }
      } catch (error) {
        console.error('Failed to create prototype version:', error);
      }
    };

    const renderContent = () => {
      if (!version || version.status === PrototypeVersionStatus.PENDING) {
        // State 1: Pending - show generate button
        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={versionStore.uploading > 0}
            sx={{ textTransform: 'none' }}
            onClick={handleGenerateClick}
          >
            {versionStore.uploading > 0 ? t('generating') : t('generate_prototype')}
          </Button>
        );
      }

      if (version.status === PrototypeVersionStatus.GENERATING) {
        // State 2: Generating - show progress
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2">{t('prototype_generating')}</Typography>
          </Box>
        );
      }

      if (version.status === PrototypeVersionStatus.COMPLETED) {
        // State 3: Completed - show preview and log links
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {version.previewUrl && (
              <Link
                href={version.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              >
                {t('view_preview')}
              </Link>
            )}
            {version.logUrl && (
              <Link
                href={version.logUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                {t('view_ai_log')}
              </Link>
            )}
          </Box>
        );
      }

      if (version.status === PrototypeVersionStatus.FAILED) {
        // State 4: Failed - show error and log link
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" color="error" sx={{ fontSize: '0.875rem' }}>
              {version.errorMessage || t('prototype_generation_failed')}
            </Typography>
            {version.logUrl && (
              <Link
                href={version.logUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.secondary',
                }}
              >
                {t('view_ai_log')}
              </Link>
            )}
          </Box>
        );
      }

      return null;
    };

    return (
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {renderContent()}
      </Box>
    );
  },
);
