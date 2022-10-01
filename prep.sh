chmod +x ./bin/ryo-wallet-rpc
chmod +x ./bin/ryo-wallet-rpc-darwin
if [[ "$OSTYPE" == "darwin"* ]]; then
    xattr -d -r com.apple.quarantine ./bin/ryo-wallet-rpc-darwin
fi