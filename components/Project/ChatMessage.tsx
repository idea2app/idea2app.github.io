import { ConsultMessage, UserRole } from '@idea2app/data-server';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';

import { FileModel } from '../../models/File';
import { i18n, I18nContext } from '../../models/Translation';
import { FilePreview } from '@/components/ui/mobx-restful-shadcn/file-preview';
import { EvaluationDisplay } from './EvaluationDisplay';

export interface ChatMessageProps extends ConsultMessage {
  onFileParse?: (messageId: number, text: string) => any;
}

@observer
export class ChatMessage extends ObservedComponent<ChatMessageProps, typeof i18n> {
  static contextType = I18nContext;

  fileStore = new FileModel();

  async componentDidMount() {
    super.componentDidMount();

    const { content, file } = this.props;

    if (!file || content) return;

    const text = await this.fileStore.getText(file);

    this.props.onFileParse?.(this.props.id, text);
  }

  render() {
    const { t } = this.observedContext,
      { project, id, content, file, evaluation, prototypes, createdAt, createdBy } = this.props;
    const isBot = createdBy.roles.includes(3 as UserRole.Robot);
    const avatarSrc = isBot ? '/robot-avatar.png' : createdBy?.avatar || '/default-avatar.png';
    const name = isBot ? `${t('ai_assistant')} 🤖` : createdBy?.name || 'User';

    return (
      <div
        className={`flex max-w-[95%] items-start gap-1 sm:max-w-[80%] ${isBot ? 'mr-auto flex-row' : 'ml-auto flex-row-reverse'}`}
      >
        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <Card className="bg-primary/10 text-foreground rounded-[16px_16px_4px_16px] border-none p-1.5 sm:p-2">
          <p className="mb-0.5 text-[0.7rem] opacity-80 sm:text-[0.75rem]">{name}</p>

          {file ? (
            <div className="mb-1">
              <FilePreview path={file} />

              {this.fileStore.downloading > 0 && (
                <div className="mt-1.5">
                  <p className="mb-1 block text-[0.7rem] opacity-80">{t('parsing_file_text')}</p>
                  <Progress value={100} className="h-1.5" />
                </div>
              )}
            </div>
          ) : (
            content && (
              <div
                className="prose mb-1 text-[0.875rem] sm:text-base"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
              />
            )
          )}
          {evaluation && (
            <EvaluationDisplay
              {...evaluation}
              projectId={project!.id}
              messageId={id}
              prototypes={prototypes}
            />
          )}
          {createdAt && (
            <p className="text-[0.65rem] opacity-60 sm:text-[0.75rem]">
              {new Date(createdAt).toLocaleTimeString()}
            </p>
          )}
        </Card>
      </div>
    );
  }
}
