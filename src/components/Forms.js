import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  ProgressBar,
} from "@themesberg/react-bootstrap";

import {
  useUploadMediaMutation,
  useCreateKnowledgeMutation,
  useUpdateKnowledgeMutation,
} from "../composers/knowledge";
import {} from "../composers/knowledge";

import { qiniu_display_domain } from "../config";
import { useAuth } from "../context/auth";
import { useOverlay } from "../context/overlay";

import Image from "./Image";

export const GeneralInfoForm = (props) => {
  const history = useHistory();
  const { auth } = useAuth();
  const { popupTypes, togglePopup } = useOverlay();
  const { id = "" } = useParams();
  const [getToken, uploadMedia] = useUploadMediaMutation();
  const [createKnowledge] = useCreateKnowledgeMutation();
  const [updateKnowledge] = useUpdateKnowledgeMutation(id);
  const { knowledge = {}, isCreate = false } = props;

  const [title, setTitle] = useState(knowledge.title || "");
  const [subtitle, setSubtitle] = useState(knowledge.subtitle || "");
  const [abstract, setAbstract] = useState(knowledge.abstract || "");
  const [cover, setCover] = useState(knowledge.cover || "");
  const [body, setBody] = useState(
    BraftEditor.createEditorState(knowledge.body || null)
  );

  const [coverProgress, setCoverProgress] = useState(0);

  const onChangeTitle = React.useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const onChangeSubtitle = React.useCallback((event) => {
    setSubtitle(event.target.value);
  }, []);

  const onChangeAbstract = React.useCallback((event) => {
    setAbstract(event.target.value);
  }, []);

  const onChangeCover = async (event) => {
    const file = event.target.files[0];
    const filename = file.name;

    try {
      const tokenResults = await getToken();

      const formData = new FormData();
      formData.append("token", tokenResults.data);
      formData.append("key", filename);
      formData.append("file", file);
      const uploadResults = await uploadMedia({
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
        onUploadProgress: (progressEvent) => {
          //imgLoadPercent 是上传进度，可以用来添加进度条
          let loadPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (loadPercent !== 100) {
            setCoverProgress(loadPercent);
          } else {
            setCoverProgress(0);
          }
        },
      });

      const url = `${qiniu_display_domain}/${uploadResults.data.key}`;
      // const url = `./${uploadResults.data.key}`;

      setCover(url);
    } catch (error) {
      togglePopup(popupTypes.ERROR, {
        message: error.message,
      });
    }
  };

  const onChangeBody = React.useCallback((editorState) => {
    setBody(editorState);
  }, []);

  const onSubmit = async () => {
    try {
      const formData = {
        cover,
        title,
        subtitle,
        abstract,
        body: body.toHTML(),
      };

      if (isCreate) {
        const results = await createKnowledge({
          data: formData,
        });
        togglePopup(popupTypes.SUCCESS, {
          message: "创建成功！",
        });
      } else {
        const results = await updateKnowledge({
          data: formData,
        });
        togglePopup(popupTypes.SUCCESS, {
          message: "修改成功",
        });
      }

      history.goBack();
    } catch (error) {
      debugger;
      togglePopup(popupTypes.ERROR, {
        message: error.message,
      });
    }
  };

  const onUploadMedia = async (param) => {
    try {
      const tokenResults = await getToken();
      const formData = new FormData();
      formData.append("token", tokenResults.data);
      formData.append("key", param.file.name);
      formData.append("file", param.file);
      const uploadResults = await uploadMedia({
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
        onUploadProgress: (progressEvent) => {
          let loadPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // 上传进度发生变化时调用param.progress
          param.progress(loadPercent);
        },
      });

      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      const mediaName = uploadResults.data.key;
      param.success({
        // url: `/${mediaName}`,
        url: `${qiniu_display_domain}/${mediaName}`,
        meta: {
          id: mediaName,
          title: mediaName,
          alt: mediaName,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
        },
      });
    } catch (error) {
      param.error({
        msg: "上传失败",
      });

      if (error.response.data.code === 0) {
        auth.logout();
        history.push("/sign-in");
      }
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">基本信息</h5>
        <Form>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="title">
                <Form.Label>标题</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="标题"
                  onChange={onChangeTitle}
                  value={title}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="subtitle">
                <Form.Label>副标题</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="副标题"
                  onChange={onChangeSubtitle}
                  value={subtitle}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="abstract">
                <Form.Label>摘要</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="摘要"
                  onChange={onChangeAbstract}
                  value={abstract}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="cover">
                <Form.Label>封面</Form.Label>
                <Form.Control
                  type="file"
                  id="cover_file"
                  label="封面"
                  accept=".jpg,.jpeg,.png"
                  onChange={onChangeCover}
                />
                {!!coverProgress && (
                  <ProgressBar animated now={coverProgress} />
                )}
                <Image src={cover} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mb-3">
              <Form.Group id="body">
                <Form.Label>内容</Form.Label>
                <BraftEditor
                  value={body}
                  style={{
                    border: "0.0625rem solid #d1d7e0",
                    borderRadius: "0.5rem",
                  }}
                  onChange={onChangeBody}
                  media={{ uploadFn: onUploadMedia }}
                  // onSave={this.submitContent}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button variant="primary" className="me-2" onClick={onSubmit}>
              保存
            </Button>
            <Button variant="primary" className="me-2" onClick={history.goBack}>
              返回
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
