import Alert from './Alert';
import ErrorBoundary from './ErrorBoundary';

export type { AlertProps } from './Alert';

type AlertType = typeof Alert;
export interface CompoundAlertType extends AlertType {
  ErrorBoundary: typeof ErrorBoundary;
}

const CompoundAlert = Alert as CompoundAlertType;

CompoundAlert.ErrorBoundary = ErrorBoundary;

export default CompoundAlert;
