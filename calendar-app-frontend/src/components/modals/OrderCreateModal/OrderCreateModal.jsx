import { Modal, Button } from "antd";

const OrderCreateModal = ({
  values,
  setValues,
  handleChange,
  handleOk,
  handleCancel,
  visible,
  isLoading
}) => {
  const { firstName, lastName, title } = values;

  return (
    <div className="form-group">
      <Modal
        visible={visible}
        title="Order room form"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder="First name"
          className="form-control m-2"
          value={firstName}
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder="Last name"
          className="form-control m-2"
          value={lastName}
        />


        <hr />
        <div className="d-flex">
          <Button type="primary" loading={isLoading} onClick={handleOk}>
            Modal
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderCreateModal;
