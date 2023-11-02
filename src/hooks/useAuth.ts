import { useAppContext } from "@/contexts/AppContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useAuth() {
  const { address, isConnected } = useAccount();
  //address is undefined here

  const { setAddress, setIsConnected } = useAppContext();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();
  const handleConnect = async () => {
    try {
      if (isConnected) {
        await handleDisconnect();
      }

      await connect();
      
      //sets context address to an empty string as useAccount address is undefined
      setAddress(address ?? "0x14A5750B0e54b57D12767B84A326C9fE59472Da5"); //try the first string in token_address_list inside addresses.ts
      setIsConnected(true);
    } catch (e) {
      console.log("Error connecting: " + e);
    }
  };  

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setAddress(address ?? "");
      setIsConnected(false);
    } catch (e) {
      console.log("Error disconnecting: " + e);
    }
  };

  return {
    address,
    isConnected,
    handleConnect,
    handleDisconnect,
  };
}
