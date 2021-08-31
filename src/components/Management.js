import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useManagement } from "../hooks/useManagement";
import Employee from "./Employee"

const Management = () => {
  const [management, managementState, managementDispatch] = useManagement()
  const { account, salary, sendAmount } = managementState

  const handleChangeAccount = (e) => {
    managementDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.event })
  }
  const handleChangeSalary = (e) => {
    managementDispatch({ type: "CHANGE_SALARY", payload: e.target.event })
  }
  const handleChangeSendAmount = (e) => {
    managementDispatch({ type: "CHANGE_SEND_AMOUNT", payload: e.target.event })
  }
  const handleClickFeed = async () => {
    await management.feed({ value: sendAmount });
  }
  const handleClickEmploy = async () => {
    await management.employ(account, salary);
  }
  return (
    <Box>
      <Text>Management</Text>
      <Input value={sendAmount} onChange={handleChangeSendAmount} />
      <Button onClick={handleClickFeed}>Feed</Button>
      <Stack spacing={3}>
        <Text>Employ people</Text>
        <Input value={account} onChange={handleChangeAccount} />
        <Input value={salary} onChange={handleChangeSalary} />
        <Button onClick={handleClickEmploy}>Employ</Button>
      </Stack>
      <Employee management={management} account={account} />
    </Box>
  );
};

export default Management;