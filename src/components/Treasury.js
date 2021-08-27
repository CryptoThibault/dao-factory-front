import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useTreasury } from "../hooks/useTreasury";
import Charge from "./Charge";

const Treasury = () => {
  const [treasury, treasuryState, treasuryDispatch] = useTreasury()
  const { name, receiver, amount, sendAmount } = treasuryState

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
  const handleClickAdd = async () => {
    await treasury.addCharge(name, receiver, amount);
  }

  return (
    <Box>
      <Button>Feed</Button>
      <Input value={sendAmount} onChange={handleChangeSendAmount}></Input>
      <Button>Transfer</Button>
      <Stack spacing={3}>
        <Text>Create Charge</Text>
        <Input value={name} onChange={handleChangeName} />
        <Input value={receiver} onChange={handleChangeReceiver} />
        <Input value={amount} onChange={handleChangeAmount} />
        <Button onClick={handleClickAdd}>Create Charge</Button>
      </Stack>
      <Charge />
    </Box>
  );
};

export default Treasury;