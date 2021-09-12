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
    await treasury.feed({ value: sendAmount });
  }
  const handleClickTransfer = async () => {
    await treasury.simpleTransfer(sendAddress, sendAmount)
  }
  const handleClickAdd = async () => {
    await treasury.addCharge(name, receiver, amount);
  }

  useEffect(() => {
    let ids = []
    let data = [{}]
    async function getCharges() {
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
    }
    getCharges()
    treasuryDispatch({ type: "LIST_CHARGES", payload: ids })
    treasuryDispatch({ type: "UPDATE_CHARGES_DATA", payload: data })
  }, [treasury, treasuryDispatch])

  return (
    <Box>
      <Text>Treasury</Text>
      <Input value={sendAmount} onChange={handleChangeSendAmount}></Input>
      <Button onClick={handleClickFeed}>Feed</Button>
      <Input value={sendAddress} onChange={handleChangeSendAddress}></Input>
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