import { PrototypeType, PrototypeVersion } from '@idea2app/data-server';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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

  private root = createRef<HTMLDivElement>();

  componentDidMount() {
    super.componentDidMount();

    this.pollStatusCheck();
  }

  async pollStatusCheck() {
    const rootElement = this.root.current;

    while (this.version?.status === 'pending' || this.version?.status === 'processing') {
      if (!rootElement?.isConnected) break;

      if (inViewport(rootElement)) this.version = await this.versionStore.getOne(this.version.id);

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
      <Button size="sm" disabled={loading} onClick={this.handleGenerateClick}>
        {loading ? t('generating') : t('generate_prototype')}
      </Button>
    );
  }

  renderGenerating() {
    const { t } = this.observedContext;

    return (
      <div className="flex items-center gap-2">
        <Progress value={100} className="h-2 w-24" />
        <p className="text-sm">{t('prototype_generating')}</p>
      </div>
    );
  }

  renderCompleted() {
    const { t } = this.observedContext;
    const { previewLink, gitLogsLink } = this.version || {};

    return (
      <div className="flex flex-wrap gap-2">
        {previewLink && (
          <Button asChild size="sm" variant="secondary">
            <a href={previewLink} target="_blank" rel="noopener noreferrer">
              {t('view_preview')}
            </a>
          </Button>
        )}
        {gitLogsLink && (
          <Button asChild size="sm" variant="outline">
            <a href={gitLogsLink} target="_blank" rel="noopener noreferrer">
              {t('view_ai_log')}
            </a>
          </Button>
        )}
      </div>
    );
  }

  renderFailed() {
    const { t } = this.observedContext;
    const { errorMessage, gitLogsLink } = this.version || {};

    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm text-red-600">{errorMessage || t('prototype_generation_failed')}</p>
        {gitLogsLink && (
          <a
            className="text-muted-foreground text-sm font-medium hover:underline"
            href={gitLogsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('view_ai_log')}
          </a>
        )}
      </div>
    );
  }

  render() {
    const { version } = this;

    return (
      <div ref={this.root} className="border-border border-t pt-2">
        {!version || version.status === 'pending'
          ? this.renderPending()
          : version.status === 'processing'
            ? this.renderGenerating()
            : version.status === 'completed'
              ? this.renderCompleted()
              : this.renderFailed()}
      </div>
    );
  }
}
