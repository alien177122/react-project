import {Component, type ErrorInfo, type ReactNode} from 'react';

interface TabErrorBoundaryProps {
  tabLabel: string;
  children: ReactNode;
}

interface TabErrorBoundaryState {
  hasError: boolean;
}

export class TabErrorBoundary extends Component<TabErrorBoundaryProps, TabErrorBoundaryState> {
  state: TabErrorBoundaryState = {hasError: false};

  static getDerivedStateFromError(): TabErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(`[TabErrorBoundary:${this.props.tabLabel}]`, error, info.componentStack);
    }
  }

  private handleRetry = () => {
    this.setState({hasError: false});
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="ta-shell" role="alert">
        <h2 className="ta-section-title">Не удалось открыть вкладку</h2>
        <p className="ta-muted">
          Произошла ошибка во вкладке «{this.props.tabLabel}». Остальные разделы приложения
          работают.
        </p>
        <button type="button" className="ta-btn ta-btn--primary" onClick={this.handleRetry}>
          Попробовать снова
        </button>
      </div>
    );
  }
}
