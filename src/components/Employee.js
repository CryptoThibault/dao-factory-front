import { Box, Button, Text } from "@chakra-ui/react";

const Employee = ({ management, id, data }) => {
  const handleClickFire = async () => {
    await management.fire(data.account);
  }
  const handleClickResign = async () => {
    await management.resign();
  }
  const handleClickPayout = async () => {
    await management.payout();
  }
  return (
    <Box>
      <Text>Address: {data.account}</Text>
      <Text>Salary: {data.salary}</Text>
      <Text>Employed at {data.employed_at}</Text>
      <Text>Last Payout: {data.last_payout}</Text>
      <Text>Id: {id}</Text>
      <Button onClick={handleClickFire}>Fire this employee</Button>
      <Button onClick={handleClickResign}>Resign from this job</Button>
      <Button onClick={handleClickPayout}>Get my paid</Button>
    </Box>
  );
};

export default Employee;