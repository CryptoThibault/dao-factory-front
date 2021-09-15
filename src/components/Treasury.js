import { Box, Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { useTreasury } from "../hooks/useTreasury";
import Charge from "./Charge";

const Treasury = ({ contractAddress }) => {
  const [web3State] = useContext(Web3Context)
  const [treasury, treasuryState, treasuryDispatch] = useTreasury()
  const { name, receiver, amount, sendAmount, sendAddress, charges_id, charges_data } = treasuryState

  const handleChangeName = (e) => {
    treasuryDispatch({ type: "CHANGE_NAME", payload: e.target.value })
  }
  const handleChangeReceiver = (e) => {
    treasuryDispatch({ type: "CHANGE_RECEIVER", payload: e.target.value })
  }
  const handleChangeAmount = (e) => {
    treasuryDispatch({ type: "CHANGE_AMOUNT", payload: e.target.value })
  }
  const handleChangeSendAmount = (e) => {
    treasuryDispatch({ type: "CHANGE_SEND_AMOUNT", payload: e.target.value })
  }
  const handleChangeSendAddress = (e) => {
    treasuryDispatch({ type: "CHANGE_SEND_ADDRESS", payload: e.target.value })
  }

  const handleClickFeed = async () => {
    const tx = await web3State.signer.sendTransaction({
      to: contractAddress,
      value: ethers.utils.parseEther(sendAmount),
    })
    await tx.wait()
  }
  const handleClickTransfer = async () => {
    const tx = await treasury.simpleTransfer(sendAddress, ethers.utils.parseEther(sendAmount))
    await tx.wait()
  }
  const handleClickAdd = async () => {
    const tx = await treasury.addCharge(name, receiver, ethers.utils.parseEther(amount));
    await tx.wait()
  }
  useEffect(() => {
    async function getCharges() {
      let ids = []
      let data = [{}]
      let id = 0
      try {
        id = await treasury.nbCharge();
      } catch (e) {
        console.log(e.message)
      }
      for (let i = 1; i <= id; i++) {
        ids.push(i)
        data.push({
          name: await treasury.nameOf(i),
          receiver: await treasury.receiverOf(i),
          amount: ethers.utils.formatEther(await treasury.amountOf(i)),
          createdAt: await treasury.creationOf(i),
          active: await treasury.activeOf(i),
          counter: await treasury.counterOf(i),
        })
      }
      treasuryDispatch({ type: "LIST_CHARGES", payload: ids })
      treasuryDispatch({ type: "UPDATE_CHARGES_DATA", payload: data })
    }
    if (treasury) {
      getCharges()
    }
  }, [treasury, treasuryDispatch])

  return (
    <Box margin={5}>
      <Text fontSize={30} align="center" margin={5}>Treasury</Text>
      <Text>Contract address: {contractAddress}</Text>
      <Stack spacing={3} margin={5}>
        <InputGroup>
          <InputLeftAddon children="Amount :" />
          <Input value={sendAmount} onChange={handleChangeSendAmount} placeholder="0.1" />
          <InputRightAddon children="ETH" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Account :" />
          <Input value={sendAddress} onChange={handleChangeSendAddress} placeholder="0x0" />
        </InputGroup>
        <Button onClick={handleClickFeed}>Feed</Button>
        <Button onClick={handleClickTransfer}>Transfer</Button>
      </Stack>
      <Stack spacing={3} margin={5}>
        <Text fontSize={20} align="center">Create Charge</Text>
        <InputGroup>
          <InputLeftAddon children="Name :" />
          <Input value={name} onChange={handleChangeName} placeholder="Charge 1" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Receiver :" />
          <Input value={receiver} onChange={handleChangeReceiver} placeholder="0x0" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Amount :" />
          <Input value={amount} onChange={handleChangeAmount} placeholder="0.1" />
          <InputRightAddon children="ETH" />
        </InputGroup>
        <Button onClick={handleClickAdd}>Create this charge</Button>
      </Stack>
      {charges_id.map(el => {
        return <Charge treasury={treasury} id={el} data={charges_data[el]} key={el} />
      })}

    </Box>
  );
};

export default Treasury;