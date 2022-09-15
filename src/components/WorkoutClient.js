import { useState, useEffect } from 'react';

const WorkoutClient = (props) => {
  const [clientInfo, setclientInfo] = useState({});

  useEffect(() => {
    const getClientInfo = async () => {
      const clientsFromServer = await FetchClientInfo();
      setclientInfo(clientsFromServer);
    };
    getClientInfo();
  }, []);

  // Fetch presence
  const FetchClientInfo = async () => {
    const res = await fetch(`http://localhost:5000/clients/${props.id}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  return (
    <>
      <td className="text-primary">
        <strong>
          {clientInfo.name} {clientInfo.surname}
        </strong>
      </td>
      <td>{clientInfo.email}</td>
      <td>{clientInfo.phone}</td>
      <td></td>
    </>
  );
};
export default WorkoutClient;
