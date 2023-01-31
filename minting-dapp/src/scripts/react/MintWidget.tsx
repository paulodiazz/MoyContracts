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
            </div>

            <div className="collection-status">
              <div className="user-address">
                <span>
                  DAVID ALFARO SIQUEIROS (Mexican 1896-1974) EL NIÑO, 1966, Piroxicylin on Mazonite 33.6 x 49.2 in (84 x 123 cm) Signed by David Alfaro Siqueiros (Lower left), <a href='https://gateway.pinata.cloud/ipfs/Qmdw2Z8XKMHvbkcPw4j3WRr3oDJQr1RChgR1UGuFQCVveY/Nin%CC%83o%20RP%20Doc%20Original%201966%20Marca%20de%20Agua.pdf'>certificate of authenticity </a>
                </span> 
              </div>
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
