export * from './questionnaire.controller';

import { QuestionnaireController } from './questionnaire.controller';
import { HealthController } from './health.controller';

export const Controllers = [QuestionnaireController, HealthController];
