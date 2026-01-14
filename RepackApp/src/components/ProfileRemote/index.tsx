import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const ProfileRemoteComponent = lazy(() => import('ProfileRemote/Profile'));

interface ProfileRemoteProps {
  userName?: string;
  userEmail?: string;
  onEditPress?: () => void;
}

class ProfileRemoteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ProfileRemote] Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              color: '#ff0000',
            }}
          >
            Failed to load ProfileRemote
          </Text>
          {this.state.error && (
            <Text style={{ fontSize: 12, color: '#999', textAlign: 'center' }}>
              Error: {this.state.error.message}
            </Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const ProfileRemote: React.FC<ProfileRemoteProps> = props => {
  return (
    <ProfileRemoteErrorBoundary>
      <Suspense
        fallback={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10, color: '#666' }}>
              Loading Profile...
            </Text>
          </View>
        }
      >
        <ProfileRemoteComponent {...props} />
      </Suspense>
    </ProfileRemoteErrorBoundary>
  );
};

export default ProfileRemote;
