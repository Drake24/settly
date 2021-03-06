import { useState } from "react";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
} from "../../../services/ClientService";
import { Modal } from "react-bootstrap";
import Client from "../../../lib/models/ClientModel";
import Navbar from "../Navbar";
import ErrorData from "../../../lib/enums/ErrorData";
import formatError from "../../../utils/FormatResponseErrorUtil";
import formatErrorBag from "../../../utils/FormatErrorBagUtil";

interface formCreate {
  firstName: string;
  lastName: string;
  email: string;
  file: File | null;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  file: null,
};

const Clients = () => {
  const { data: clients, error, isLoading } = useGetClientsQuery();

  const [responseError, setResponseError] = useState<ErrorData | null>();
  const [responseErrorEdit, setResponseErrorEdit] =
    useState<ErrorData | null>();
  const [errors, setError] = useState<Array<string> | null>([]);

  const [addClient] = useAddClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [show, setShow] = useState(false);

  const [client, setClient] = useState<formCreate>(initialState);
  const [editClient, setEditClient] = useState<Client>(initialState);

  const onHandleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [event.currentTarget.name]:
        event.currentTarget.name !== "file"
          ? event.currentTarget.value
          : event.currentTarget.files?.[0],
    });
  };

  const onHandleEditClient = (event: React.FormEvent<HTMLInputElement>) => {
    setEditClient({
      ...editClient,
      [event.currentTarget.name]:
        event.currentTarget.name !== "file"
          ? event.currentTarget.value
          : event.currentTarget.files?.[0],
    });
  };

  const onCreate = async () => {
    await addClient(client)
      .unwrap()
      .then((client: Client) => {
        setResponseError(null);
        setClient({ ...initialState });
        setError(null);
      })
      .catch((error: ErrorData) => {
        setResponseError(formatError(error));
        setError(formatErrorBag(error));
      });
  };

  const onDelete = async (client: Client) => {
    await deleteClient(client);
  };

  const onUpdate = async () => {
    await updateClient(editClient)
      .unwrap()
      .then((client: Client) => {})
      .catch((error: ErrorData) => {
        setResponseErrorEdit(formatError(error));
      });
    setShow(false);
  };

  const openEditModal = (client: Client) => {
    setEditClient(client);
    setShow(true);
  };

  const closeEditModal = () => setShow(false);

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="row align-items-md-stretch">
          <div className="col-md-4">
            <div className="p-5 mb-4 bg-light rounded-3">
              <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Add Client</h1>
                {responseError?.errors
                  ? responseError?.errors?.message
                  : responseError?.message}

                {errors?.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
                <div className="form-floating mb-3">
                  <input
                    name="firstName"
                    type="text"
                    className="form-control border-0 border-bottom"
                    placeholder="First Name"
                    onChange={onHandleChange}
                    value={client.firstName}
                  />
                  <label>First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="lastName"
                    type="email"
                    className="form-control border-0 border-bottom"
                    placeholder="Last Name"
                    onChange={onHandleChange}
                    value={client.lastName}
                  />
                  <label>Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control border-0 border-bottom"
                    placeholder="username@email.com"
                    onChange={onHandleChange}
                    value={client.email}
                  />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="file"
                    type="file"
                    className="form-control border-0 border-bottom"
                    onChange={onHandleChange}
                  />
                  <label>Profile Photo</label>
                </div>
                <div className="d-grid gap-2">
                  <button
                    onClick={onCreate}
                    className="btn btn-primary btn-create rounded-xl p-3 text-uppercase"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-5 mb-4 bg-light rounded-3">
              <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">List of Clients</h1>
                {responseErrorEdit?.errors
                  ? responseErrorEdit?.errors?.message
                  : responseErrorEdit?.message}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients?.map((client: Client, index: number) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.email}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary m-1"
                            onClick={() => {
                              openEditModal(client);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              onDelete(client);
                            }}
                            type="button"
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-floating mb-3">
              <input
                name="firstName"
                type="text"
                className="form-control border-0 border-bottom"
                onChange={onHandleEditClient}
                value={editClient.firstName}
              />
              <label>First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="lastName"
                type="text"
                className="form-control border-0 border-bottom"
                onChange={onHandleEditClient}
                value={editClient.lastName}
              />
              <label>Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="email"
                type="email"
                className="form-control border-0 border-bottom"
                placeholder="name@example.com"
                onChange={onHandleEditClient}
                value={editClient.email}
              />
              <label>Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="file"
                type="file"
                className="form-control border-0 border-bottom"
                onChange={onHandleEditClient}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={onUpdate}
              type="button"
              className="btn btn-sm btn-primary m-1"
            >
              Update
            </button>
            <button
              onClick={closeEditModal}
              type="button"
              className="btn btn-sm btn-danger m-1"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Clients;
