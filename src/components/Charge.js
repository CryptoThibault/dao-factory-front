import { Box, Button, Text } from "@chakra-ui/react";

const Charge = ({ treasury, id, data }) => {
  const handleClickCancel = async () => {
    const tx = await treasury.cancelCharge(id)
    await tx.wait()
  }
  const handleClickPay = async () => {
    const tx = await treasury.payCharge(id)
    await tx.wait()
  }
  return (
    <Box>
      <Text>Charge {id}</Text>
      <Text>Name: {data.name}</Text>
      <Text>Receiver: {data.receiver}</Text>
      <Text>Amount: {data.amount}</Text>
      <Text>Created at: {data.createdAt}</Text>
      <Text>Active: {data.active}</Text>
      <Text>Use counter: {data.counter}</Text>
      <Button onClick={handleClickCancel}>Cancel this charge</Button>
      <Button onClick={handleClickPay}>Pay this Charge</Button>
    </Box>
  );
};

export default Charge;