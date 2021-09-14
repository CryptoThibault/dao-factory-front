import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useManagement } from "../hooks/useManagement";
import Employee from "./Employee"

const Management = () => {
  const [management, managementState, managementDispatch] = useManagement()
  const { account, salary, sendAmount, employees_id, employees_data } = managementState

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
    const tx = await management.feed({ value: sendAmount });
    await tx.wait()
  }
  const handleClickEmploy = async () => {
    const tx = await management.employ(account, salary);
    await tx.wait()
  }
  useEffect(() => {
    async function getEmployees() {
      let ids = []
      let data = [{}]
      const id = await management.nbEmployee();
      for (let i = 1; i <= id; i++) {
        let account_ = await management.accountAt(id)
        ids.push(i)
        data.push({
          account: account_,
          salary: await management.salaryOf(account_),
          employed_at: await management.employmentOf(account_),
          next_payout: await management.lastPayoutOf(account_),
        })
      }
      managementDispatch({ type: "LIST_EMPLOYEES", payload: ids })
      managementDispatch({ type: "UPDATE_EMPLOYEES_DATA", payload: data })
    }
    if (management) {
      getEmployees()
    }
  }, [management, managementDispatch])

  return (
    <Box>
      <Text fontSize={30} align="center">Management</Text>
      <Input value={sendAmount} onChange={handleChangeSendAmount} />
      <Button onClick={handleClickFeed}>Feed</Button>
      <Stack spacing={3}>
        <Text>Employ people</Text>
        <Input value={account} onChange={handleChangeAccount} />
        <Input value={salary} onChange={handleChangeSalary} />
        <Button onClick={handleClickEmploy}>Employ</Button>
      </Stack>
      {employees_id.map(el => {
        return <Employee management={management} id={el} data={employees_data[el]} />
      })}
    </Box>
  );
};

export default Management;