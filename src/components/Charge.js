import { Box, Button, Text } from "@chakra-ui/react";

const Charge = ({ treasury, id, data }) => {
  const handleClickCancel = async () => {
    await treasury.cancelCharge(id);
  }
  const handleClickPay = async () => {
    await treasury.payCharge(id)
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