import { Box, Button, Text } from "@chakra-ui/react";

const Employee = ({ management, id, data }) => {
  const handleClickFire = async () => {
    const tx = await management.fire(data.account);
    await tx.wait()
  }
  const handleClickResign = async () => {
    const tx = await management.resign();
    await tx.wait()
  }
  const handleClickPayout = async () => {
    const tx = await management.payout();
    await tx.wait()
  }
  return (
    <Box>
      <Text>Address: {data.account}</Text>
      <Text>Salary: {data.salary}</Text>
      <Text>Employed at: {data.employed_at}</Text>
      <Text>Next Payout Timestamp: {data.next_payout}</Text>
      <Text>Id: {id}</Text>
      <Button onClick={handleClickFire}>Fire this employee</Button>
      <Button onClick={handleClickResign}>Resign from this job</Button>
      <Button onClick={handleClickPayout}>Get my paid</Button>
    </Box>
  );
};

export default Employee;