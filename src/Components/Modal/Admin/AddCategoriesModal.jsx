/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Form, Input, Modal, Typography } from "antd";
import { useCreateCtegoryMutation } from "../../../redux/api/categoryApi";

const AddCategoriesModal = ({
  isAddCompanyModalVisible,
  handleCancel,
  length,
}) => {

  const [addCategory] = useCreateCtegoryMutation();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Service User:", values);
    try {
      const res = await addCategory(values).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleCancel();
    form.resetFields();
    // window.location.reload();
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#E8EBEC",
            headerBg: "#E8EBEC",
          },
        },
      }}
    >
      <Modal
        open={isAddCompanyModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        className="lg:!w-[1000px]"
      >
        <div className="p-10">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full text-start"
          >
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Category Serial
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Category Serial",
                },
              ]}
              initialValue={length + 1}
              name="serial"
              className=" "
            >
              <Input
                readOnly
                // defaultValue={length + 1}
                placeholder="Enter Category Serial"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#222222" }}>
              Category Name
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Category Name",
                },
              ]}
              name="name"
              className=" "
            >
              <Input
                placeholder="Enter Category Name"
                className="py-2 px-3 text-xl border !border-input-color !bg-transparent"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-3"
                htmlType="submit"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddCategoriesModal;
