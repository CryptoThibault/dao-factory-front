import { Box, Text } from "@chakra-ui/react";

const Charge = ({ treasury, id, data }) => {
  return (
    <Box>
      <Text>Charge {id}</Text>
      <Text>Name: {data.name}</Text>
      <Text>Receiver: {data.receiver}</Text>
      <Text>Amount: {data.amount}</Text>
      <Text>Created at: {data.createdAt}</Text>
      <Text>Active: {data.active}</Text>
      <Text>Use counter: {data.counter}</Text>
    </Box>
  );
};

export default Charge;