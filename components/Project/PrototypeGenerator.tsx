import { PrototypeType, PrototypeVersion } from '@idea2app/data-server';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { createRef } from 'react';
import { inViewport, sleep } from 'web-utility';

import { PrototypeVersionModel } from '../../models/PrototypeVersion';
import { i18n, I18nContext } from '../../models/Translation';

export interface PrototypeGeneratorProps {
  projectId: number;
  messageId: number;
  type: PrototypeType;
  prototype?: PrototypeVersion;
}

@observer
export class PrototypeGenerator extends ObservedComponent<PrototypeGeneratorProps, typeof i18n> {
  static contextType = I18nContext;

  versionStore = new PrototypeVersionModel(this.props.projectId, this.props.type);

  @observable
  accessor version = this.props.prototype;

  private root = createRef<HTMLElement>();

  componentDidMount() {
    super.componentDidMount();

    this.pollStatusCheck();
  }

  async pollStatusCheck() {
    const { props, version } = this,
      rootElement = this.root.current;

    while (version?.status === 'pending' || version?.status === 'processing') {
      if (!rootElement?.isConnected) break;

      if (inViewport(rootElement))
        this.version = await this.versionStore.getOne(props.prototype!.id);

      await sleep(3);
    }
  }

  handleGenerateClick = async () => {
    this.version = await this.versionStore.updateOne({
      evaluationMessage: this.props.messageId,
    });

    return this.pollStatusCheck();
  };

  renderPending() {
    const { t } = this.observedContext;
    const loading = this.versionStore.uploading > 0;

    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={loading}
        sx={{ textTransform: 'none' }}
        onClick={this.handleGenerateClick}
      >
        {loading ? t('generating') : t('generate_prototype')}
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
    const { previewLink, gitLogsLink } = this.version || {};

    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {previewLink && (
          <Link
            href={previewLink}
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
        {gitLogsLink && (
          <Link
            href={gitLogsLink}
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
    const { errorMessage, gitLogsLink } = this.version || {};

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body2" color="error" sx={{ fontSize: '0.875rem' }}>
          {errorMessage || t('prototype_generation_failed')}
        </Typography>
        {gitLogsLink && (
          <Link
            href={gitLogsLink}
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

    return (
      <Box ref={this.root} sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        {!version || version.status === 'pending'
          ? this.renderPending()
          : version.status === 'processing'
            ? this.renderGenerating()
            : version.status === 'completed'
              ? this.renderCompleted()
              : this.renderFailed()}
      </Box>
    );
  }
}
