import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTreasury } from "../hooks/useTreasury";
import Charge from "./Charge";

const Treasury = () => {
  const [treasury, treasuryState, treasuryDispatch] = useTreasury()
  const { name, receiver, amount, sendAmount, sendAddress, charges_id, charges_data } = treasuryState

  const handleChangeName = (e) => {
    treasuryDispatch({ type: "CHANGE_NAME", payload: e.target.event })
  }
  const handleChangeReceiver = (e) => {
    treasuryDispatch({ type: "CHANGE_RECEIVER", payload: e.target.event })
  }
  const handleChangeAmount = (e) => {
    treasuryDispatch({ type: "CHANGE_AMOUNT", payload: e.target.event })
  }
  const handleChangeSendAmount = (e) => {
    treasuryDispatch({ type: "CHANGE_SEND_AMOUNT", payload: e.target.event })
  }
  const handleChangeSendAddress = (e) => {
    treasuryDispatch({ type: "CHANGE_SEND_ADDRESS", payload: e.target.event })
  }

  const handleClickFeed = async () => {
    const tx = await treasury.feed({ value: sendAmount });
    await tx.wait()
  }
  const handleClickTransfer = async () => {
    const tx = await treasury.simpleTransfer(sendAddress, sendAmount)
    await tx.wait()
  }
  const handleClickAdd = async () => {
    const tx = await treasury.addCharge(name, receiver, amount);
    await tx.wait()
  }

  useEffect(() => {
    async function getCharges() {
      let ids = []
      let data = [{}]
      const id = await treasury.nbCharge();
      for (let i = 1; i <= id; i++) {
        ids.push(i)
        data.push({
          name: await treasury.nameOf(i),
          receiver: await treasury.receiverOf(i),
          amount: await treasury.amountOf(i),
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
    <Box>
      <Text fontSize={30} align="center">Treasury</Text>
      <Input value={sendAmount} onChange={handleChangeSendAmount}></Input>
      <Input value={sendAddress} onChange={handleChangeSendAddress}></Input>
      <Button onClick={handleClickFeed}>Feed</Button>
      <Button onClick={handleClickTransfer}>Transfer</Button>
      <Stack spacing={3}>
        <Text>Create Charge</Text>
        <Input value={name} onChange={handleChangeName} />
        <Input value={receiver} onChange={handleChangeReceiver} />
        <Input value={amount} onChange={handleChangeAmount} />
        <Button onClick={handleClickAdd}>Create Charge</Button>
      </Stack>
      {charges_id.map(el => {
        return <Charge treasury={treasury} id={el} data={charges_data[el]} />
      })}

    </Box>
  );
};

export default Treasury;