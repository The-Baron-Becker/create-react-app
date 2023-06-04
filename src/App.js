import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { usePrivy } from "@privy-io/react-auth";
import Cookies from "js-cookie";

function App() {
  const { ready, authenticated, user, login, logout, linkEmail, linkWallet, unlinkWallet, unlinkEmail, linkGoogle, unlinkGoogle, linkApple, unlinkApple, linkTwitter, unlinkTwitter, linkPhone, unlinkPhone} = usePrivy();
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const loginButtonRef = useRef(null);

  useEffect(() => {
    if (ready && !authenticated && loginButtonRef.current) {
      loginButtonRef.current.click();
    }
  }, [ready, authenticated]);

  useEffect(() => {
    if (ready) {
      if (authenticated) {
        Cookies.set("user", JSON.stringify(user));
      } else {
        Cookies.remove("user");
      }
    }
  }, [ready, authenticated, user]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };
  
  const handleLinkEmail = () => {
    linkEmail(); // Call linkEmail when the button is clicked
  };

  const handleunLinkEmail = (emailAddress) => {
    unlinkEmail(emailAddress); // Call unlinkEmail with the email address when the button is clicked
  };

  const handleLinkWallet = () => {
    linkWallet(); // Call linkEmail when the button is clicked
  };

  const handleunLinkWallet = (walletAddress) => {
    unlinkWallet(walletAddress); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleLinkGoogle = () => {
    linkGoogle(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleunLinkGoogle = () => {
    unlinkGoogle(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleLinkApple = () => {
    linkApple(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleunLinkApple = () => {
    unlinkApple(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleLinkTwitter = () => {
    linkTwitter(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleunLinkTwitter = () => {
    unlinkTwitter(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleLinkPhone = () => {
    linkPhone(); // Call unlinkWallet with the wallet address when the button is clicked
  };

  const handleunLinkPhone = (number) => {
    unlinkPhone(number); // Call unlinkWallet with the wallet address when the button is clicked
  };


  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
    setButtonClicked((prevState) => !prevState);
  };
  

  return (
    <div>
      {authenticated ? (
        <div className="dropdown">
          <button className={`privy-login-button${buttonClicked ? ' clicked' : ''}`} onClick={toggleDropdown}>
            {user.wallet
              ? `${user.wallet.address.substring(0, 4)}...${user.wallet.address.slice(-5)}`
              : (user.email
                  ? user.email.address
                  : (user.google
                      ? user.google.email
                      : (user.twitter
                          ? user.twitter.username
                          : (user.apple
                              ? user.apple.email
                              : (user.phone
                                  ? user.phone.number
                                  : 'None'
                                )
                            )
                        )
                    )
                )
            }
          </button>

          {showDropdown && (
            <div className="dropdown-content">
              <div className="privy-dropdown">
                <h5 className="account-text">Account</h5>
                <div className="createdat-text">Created: {user && user.createdAt && user.createdAt.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Wallet: {user.wallet ? `${user.wallet.address.substring(0, 4)}...${user.wallet.address.slice(-5)}` : "None"}
                  </div>
                  <button
                    className="add-login-button w-button add-wallet"
                    onClick={() => {
                      if (user.wallet) {
                        handleunLinkWallet(user.wallet.address);
                      } else {
                        handleLinkWallet();
                      }
                    }}
                  >
                    {user.wallet ? "Remove" : "Add"}
                  </button>
                </div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Email: {user.email ? user.email.address : "None"}
                  </div>
                  <button
                    className="add-login-button w-button"
                    onClick={() => {
                      if (user.email) {
                        handleunLinkEmail(user.email.address);
                      } else {
                        handleLinkEmail();
                      }
                    }}
                  >
                    {user.email ? "Remove" : "Add"}
                  </button>
                </div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Google: { user.google ? user.google.email : 'None' }
                  </div>
                  <button
                    className="add-login-button w-button"
                    onClick={() => {
                      if (user.google) {
                        handleunLinkGoogle(user.google.email);
                      } else {
                        handleLinkGoogle();
                      }
                    }}
                  >
                    {user.google ? "Remove" : "Add"}
                  </button>
                </div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Twitter: { user.twitter ? user.twitter.username : 'None' }
                  </div>
                  <button
                    className="add-login-button w-button"
                    onClick={() => {
                      if (user.twitter) {
                        handleunLinkTwitter(user.twitter.username);
                      } else {
                        handleLinkTwitter();
                      }
                    }}
                  >
                    {user.twitter ? "Remove" : "Add"}
                  </button>
                </div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Apple: { user.apple ? user.apple.email : 'None' }
                  </div>
                  <button
                    className="add-login-button w-button"
                    onClick={() => {
                      if (user.apple) {
                        handleunLinkApple(user.apple.email);
                      } else {
                        handleLinkApple();
                      }
                    }}
                  >
                    {user.apple ? "Remove" : "Add"}
                  </button>
                </div>
                <div className="cred-div">
                  <div className="privy-dropdown-text">
                    Phone: { user.phone ? user.phone.number : 'None' }
                  </div>
                  <button
                    className="add-login-button w-button"
                    onClick={() => {
                      if (user.phone) {
                        handleunLinkPhone(user.phone.number);
                      } else {
                        handleLinkPhone();
                      }
                    }}
                  >
                    {user.phone ? "Remove" : "Add"}
                  </button>
                </div>
                <div class="cred-div logout-button-privy" onClick={handleLogout}>
                  <div class="privy-dropdown-text" >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button ref={loginButtonRef} className="privy-login-button" onClick={login}>
          Log In
        </button>
      )}
    </div>
  );
  
  
  
  
}

export default App;
