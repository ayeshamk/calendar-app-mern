import { Modal, Button } from "antd";
import { Input } from "antd";
import moment from "moment";
const OrderEditModal = ({
  values,
  handleChange,
  handleOk,
  handleCancel,
  visible,
  isLoading,
}) => {
  const { firstName, lastName, title, start, end, phoneNumber } = values;
  return (
    <form onSubmit={handleOk}>
      <div className="form-group">
        <Modal
          visible={visible}
          title={`Edit order`}
          onOk={handleOk}
          onCancel={handleCancel}
          width="600px"
        >
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            className="form-control m-2"
            value={title}
            size="large"
          />
          <Input
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder="First name"
            className="form-control m-2"
            value={firstName}
            size="large"
          />
          <Input
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Last name"
            className="form-control m-2"
            value={lastName}
            size="large"
          />
          <Input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Phone number"
            className="form-control m-2"
            value={phoneNumber}
            size="large"
          />
          <hr />
          <div className="d-flex">
            <Button type="primary" loading={isLoading} onClick={handleOk}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </form>
  );
};

export default OrderEditModal;
