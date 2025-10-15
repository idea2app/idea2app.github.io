import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { sleep } from 'web-utility';

import {
  PrototypeVersion,
  PrototypeVersionModel,
  PrototypeVersionStatus,
} from '../../models/PrototypeVersion';
import { i18n, I18nContext } from '../../models/Translation';

export interface PrototypeGeneratorToolbarProps {
  projectId: number;
  messageId: number;
}

@observer
export class PrototypeGeneratorToolbar extends ObservedComponent<
  PrototypeGeneratorToolbarProps,
  typeof i18n
> {
  static contextType = I18nContext;

  versionStore = new PrototypeVersionModel(this.props.projectId);

  @observable
  accessor version: PrototypeVersion | null = null;

  @observable
  accessor isPolling = false;

  componentDidMount() {
    void this.loadVersion();
  }

  componentDidUpdate(prevProps: PrototypeGeneratorToolbarProps) {
    if (prevProps.messageId !== this.props.messageId) {
      void this.loadVersion();
    }

    if (this.version?.status === PrototypeVersionStatus.GENERATING) {
      this.startPolling();
    }
  }

  componentWillUnmount() {
    this.isPolling = false;
  }

  async loadVersion() {
    const existingVersion = await this.versionStore.getVersionByMessageId(this.props.messageId);
    this.version = existingVersion;
  }

  async startPolling() {
    if (this.isPolling) return;

    this.isPolling = true;

    for (let i = 0; i < 100; i++) {
      if (!this.isPolling) break;

      await sleep(3);

      const updatedVersion = await this.versionStore.getVersionByMessageId(this.props.messageId);
      this.version = updatedVersion;

      if (
        updatedVersion?.status === PrototypeVersionStatus.COMPLETED ||
        updatedVersion?.status === PrototypeVersionStatus.FAILED
      ) {
        this.isPolling = false;
        break;
      }
    }

    this.isPolling = false;
  }

  handleGenerateClick = async () => {
    try {
      const newVersion = await this.versionStore.updateOne({ messageId: this.props.messageId });
      if (newVersion) {
        this.version = newVersion;
      }
    } catch (error) {
      console.error('Failed to create prototype version:', error);
    }
  };

  renderPending() {
    const { t } = this.observedContext;
    const { versionStore } = this;

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={versionStore.uploading > 0}
        sx={{ textTransform: 'none' }}
        onClick={this.handleGenerateClick}
      >
        {versionStore.uploading > 0 ? t('generating') : t('generate_prototype')}
      </Button>
    );
  }

  renderGenerating() {
    const { t } = this.observedContext;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={16} />
        <Typography variant="body2">{t('prototype_generating')}</Typography>
      </Box>
    );
  }

  renderCompleted() {
    const { t } = this.observedContext;
    const { version } = this;

    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {version!.previewUrl && (
          <Link
            href={version!.previewUrl}
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
        {version!.logUrl && (
          <Link
            href={version!.logUrl}
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

  renderFailed() {
    const { t } = this.observedContext;
    const { version } = this;

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body2" color="error" sx={{ fontSize: '0.875rem' }}>
          {version!.errorMessage || t('prototype_generation_failed')}
        </Typography>
        {version!.logUrl && (
          <Link
            href={version!.logUrl}
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

  render() {
    const { version } = this;

    let content = null;

    if (!version || version.status === PrototypeVersionStatus.PENDING) {
      content = this.renderPending();
    } else if (version.status === PrototypeVersionStatus.GENERATING) {
      content = this.renderGenerating();
    } else if (version.status === PrototypeVersionStatus.COMPLETED) {
      content = this.renderCompleted();
    } else if (version.status === PrototypeVersionStatus.FAILED) {
      content = this.renderFailed();
    }

    return (
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {content}
      </Box>
    );
  }
}
