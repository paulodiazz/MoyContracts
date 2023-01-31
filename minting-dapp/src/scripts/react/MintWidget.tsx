import { utils, BigNumber } from 'ethers';
import React from 'react';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  loading: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }

    await this.props.whitelistMintTokens(this.state.mintAmount);
  }

  render() {
    return (
      <>
        {this.canMint() ?
          <div className={`mint-widget ${this.props.loading ? 'animate-pulse saturate-0 pointer-events-none' : ''}`}>
            <div className="preview flex">
              <img src="/build/images/siqueiros.avif" alt="Collection preview" />
              <img src="/build/images/card.jpg" alt="Collection preview" />
              <img src="/build/images/signature.jpg" alt="Collection preview" />
            </div>

            <div className="collection-status">
              {/* Autor */}
              <div className="supply">
                <span className="label">Autor</span>
                David Alfaro Siqueiros
              </div>
              {/* Date */}
              <div className="current-sale">
                <span className="label">Date</span>
                1966 Circa
              </div>
              {/* Materiales */}
              <div className="supply">
                <span className="label">Materials</span>
                Piroxilina Sobre Mazonite
              </div>
              {/* Medidas */}
              <div className="current-sale">
                <span className="label">Size</span>
                84 X 123 Cm
              </div>
              {/* Precio */}
              <div className="supply">
                <span className="label">Price</span>
                550,000 USD
              </div>
              {/* Título */}
              <div className="current-sale">
                <span className="label">Title</span>
                Niño
              </div>
            </div>
            

            <div className="price">
              <strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))} {this.props.networkConfig.symbol}
            </div>

            <div className="controls">
              <button className="decrease" disabled={this.props.loading} onClick={() => this.decrementMintAmount()}>-</button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button className="increase" disabled={this.props.loading} onClick={() => this.incrementMintAmount()}>+</button>
              <button className="primary" disabled={this.props.loading} onClick={() => this.mint()}>Mint</button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>

            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during the next sale!
          </div>
        }
      </>
    );
  }
}
