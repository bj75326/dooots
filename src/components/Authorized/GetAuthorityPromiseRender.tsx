import React from 'react';
import { IAuthorityType, checkPermissions } from './CheckPermissions';

interface GetAuthorityPromiseRenderProps<T, K> {
  authority: IAuthorityType;
  target: T;
  exception: K;
  current: string | string[] | Promise<string | string[]>;
}

interface GetAuthorityPromiseRenderState {
  currentAuthority: string | string[] | Promise<string | string[]>;
}

export default class GetAuthorityPromiseRender<T, K> extends React.Component<
  GetAuthorityPromiseRenderProps<T, K>,
  GetAuthorityPromiseRenderState
> {
  constructor(props: Readonly<GetAuthorityPromiseRenderProps<T, K>>) {
    super(props);
    this.state = {
      currentAuthority: props.current,
    };
  }

  componentDidMount() {
    if (this.state.currentAuthority instanceof Promise) {
      this.state.currentAuthority
        .then(authority => {
          this.setState({
            currentAuthority: authority,
          });
        })
        .catch(() => {
          this.setState({
            currentAuthority: 'ERROR',
          });
        });
    }
  }

  render() {
    const { currentAuthority } = this.state;
    const { authority, target, exception: Exception } = this.props;

    return currentAuthority instanceof Promise ? (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      ></div>
    ) : (
      checkPermissions<T, K>(authority, currentAuthority, target, Exception)
    );
  }
}
