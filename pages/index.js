import { useState } from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function Home() {
  // State
  const [uploading, setUploading] = useState(false);

  /**
   * Before upload
   * @param {File} file File
   */
  const beforeUpload = function (file) {
    const goodFormat = file.type === "image/jpeg" || file.type === "image/png";
    const goodSize = file.size / 1024 / 1024 < 5;

    return goodFormat && goodSize;
  };

  /**
   * On avatar change
   * @param {Object} info Info
   */
  const onChange = async function (info) {
    if (info.file.status === "uploading") {
      setUploading(true);
    }

    if (info.file.status === "done") {
      try {
        // Read image
        const img = await getBase64(info.file.originFileObj);
        console.log(img);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  /**
   * Read base64 image
   * @param {File} file File
   */
  const getBase64 = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  };

  /**
   * Render
   */
  return (
    <Upload
      accept={".jpg,.png"}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={onChange}
    >
      <Button size="small" icon={<UploadOutlined />} loading={uploading}>
        Upload new
      </Button>
    </Upload>
  );
}
