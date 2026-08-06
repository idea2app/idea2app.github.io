import {
  PrototypeType,
  PrototypeVersion,
  RequirementEvaluation,
  UserRole,
} from '@idea2app/data-server';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { i18n, I18nContext } from '../../models/Translation';
import userStore from '../../models/User';
import { PrototypeGenerator, PrototypeGeneratorProps } from './PrototypeGenerator';

export const DevelopmentScopeName = ({ t }: typeof i18n) => [
  t('product_prototype'),
  t('ui_design'),
  t('desktop'),
  t('mobile'),
  t('server'),
];

export interface EvaluationDisplayProps
  extends RequirementEvaluation, Pick<PrototypeGeneratorProps, 'projectId' | 'messageId'> {
  prototypes?: PrototypeVersion[];
}

export const EvaluationDisplay: FC<EvaluationDisplayProps> = observer(
  ({
    title,
    scopes = [],
    models,
    developerCount,
    designerCount,
    workload,
    monthPeriod,
    budget,
    factor,
    projectId,
    messageId,
    prototypes,
  }) => {
    const i18n = useContext(I18nContext);
    const { t } = i18n,
      { roles } = userStore.session || {};

    return (
      <div className="prose text-sm">
        {title && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h3 className="mb-1 font-semibold">{title}</h3>
          </div>
        )}
        {scopes[0] && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('development_scopes')}</h4>
            <ul className="mt-1 space-y-1 pl-5">
              {scopes.map(scope => {
                const prototypeType = (
                  scope === 2 ? 'desktop' : scope === 3 ? 'mobile' : undefined
                ) as PrototypeType;

                return (
                  <li key={scope} className="flex flex-wrap items-center gap-2">
                    {DevelopmentScopeName(i18n)[scope]}

                    {prototypeType && (
                      <PrototypeGenerator
                        {...{ projectId, messageId }}
                        type={prototypeType}
                        prototype={prototypes?.find(({ type }) => type === prototypeType)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {models?.[0] && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('feature_modules')}</h4>
            <ol className="mt-1 space-y-1 pl-5">
              {models.map((model, index) => (
                <li key={index} className="ml-1">
                  {model}
                </li>
              ))}
            </ol>
          </div>
        )}
        {workload && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('workload')}</h4> {workload} {t('hours')}
          </div>
        )}
        {monthPeriod && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('timeline')}</h4> {monthPeriod} {t('months')}
          </div>
        )}
        {budget && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('budget')}</h4> RMB￥{budget.toLocaleString()}
          </div>
        )}
        {(developerCount || designerCount) && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('team_size')}</h4>{' '}
            {[
              developerCount && `${developerCount} ${t('developers')}`,
              designerCount && `${designerCount} ${t('designers')}`,
            ]
              .filter(Boolean)
              .join(', ')}
          </div>
        )}
        {roles && roles.includes(2 as UserRole.Client) && (
          <div className="evaluation-item border-primary/60 mb-2 border-l-2 py-1 pl-2 text-sm">
            <h4 className="font-semibold">{t('complexity_factor')}</h4> {factor}
          </div>
        )}
      </div>
    );
  },
);
