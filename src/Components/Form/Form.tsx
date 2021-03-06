/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import {
  CustomButton,
  CustomInput,
  CustomRadioButton,
  CustomSelect,
} from "components";
import { StyleSheet, css } from "aphrodite";
import { lightShadow, palette, typography } from "styles";
import { useTranslation } from "react-i18next";
import { Icons } from "constants/enums/Icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addTodo } from "store/todo/todoActions";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import {
  Category,
  Priority,
  TodoType,
  Message,
  categoryTitleOptions,
} from "constants/types";

export const Form: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const validationSchema = () =>
    Yup.object().shape({
      taskTitle: Yup.string().required(`${t("validation.title-is-required")}`),
      taskDescription: Yup.string().required(
        `${t("validation.description-is-required")}`
      ),
      taskCategory: Yup.string().required(
        `${t("validation.category-is-required")}`
      ),
      taskPriority: Yup.string().required(
        `${t("validation.priority-is-required")}`
      ),
    });

  const showAlert = (message: string, typeMessage: Message) => {
    switch (typeMessage) {
      case "success":
        alert.success(t(message));
        break;
      case "show":
        alert.show(message);
        break;
      case "error":
        alert.show(message);
        break;
    }
  };
  const {
    values,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    handleSubmit,
    isValid,
    setFieldValue,
    dirty,
  } = useFormik({
    initialValues: {
      taskTitle: "",
      taskDescription: "",
      taskCategory: "",
      taskPriority: "",
    },
    validationSchema,
    onSubmit: (values) => {
      let id = new Date().getUTCMilliseconds();
      const todo: TodoType = {
        id: id,
        userId: 1,
        title: values.taskTitle,
        completed: false,
        priority: values.taskPriority as Priority,
        category: values.taskCategory as Category,
        description: values.taskDescription,
      };
      dispatch(addTodo(todo, showAlert));
      resetForm();
    },
  });

  const errorsElements = Object.entries(errors).map(([key, value]) => (
    <p className={css(typography.normalFont, styles.errorsForm)} key={key}>
      {value}
    </p>
  ));

  return (
    <div className={css(styles.formWrapper)}>
      <h2 className={css(typography.logoFont, styles.formTitle)}>
        {t("add-new-task")}
      </h2>
      <form onSubmit={handleSubmit} className={css(styles.form)}>
        <CustomInput
          name="taskTitle"
          type="text"
          placeholder={t("form.write")}
          label={t("form.title")}
          onChange={handleChange}
          value={values.taskTitle}
          customStyle={errors.taskTitle && styles.errorInput}
        />
        <CustomInput
          name="taskDescription"
          type="text"
          placeholder={t("form.write")}
          label={t("form.description")}
          onChange={handleChange}
          value={values.taskDescription}
          customStyle={errors.taskDescription && styles.errorInput}
        />
        <p className={css(typography.bigFont, styles.radioHeader)}>
          {t("choose-priority")}
        </p>
        <div className={css(styles.radioGroup)}>
          <CustomRadioButton
            name="taskPriority"
            id="low"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.taskPriority}
            label={t("priority.low")}
          />
          <CustomRadioButton
            name="taskPriority"
            id="medium"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.taskPriority}
            label={t("priority.medium")}
          />
          <CustomRadioButton
            name="taskPriority"
            id="high"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.taskPriority}
            label={t("priority.high")}
          />
        </div>
        <CustomSelect
          label={t("choose-category")}
          options={categoryTitleOptions}
          value={values.taskCategory}
          onChange={(value) => setFieldValue("taskCategory", value.value)}
        />
        <CustomButton
          type="submit"
          label={t("add-task")}
          disabled={!isValid || !dirty}
          customStyles={styles.btnAddTask}
          icon={{
            iconName: Icons.faPlusSquare,
          }}
        />
        {errorsElements}
      </form>
    </div>
  );
};
const styles = StyleSheet.create({
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0px",
    backgroundColor: `${palette.darkBlueTwo}`,
    boxShadow: `${lightShadow}`,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px",
  },
  formTitle: {
    ...typography.logoFont,
    color: `${palette.white}`,
  },
  radioGroup: {
    display: "flex",
    margin: "5px 0px 15px",
  },
  radioHeader: {
    marginTop: "15px",
    color: `${palette.white}`,
    textTransform: "uppercase",
  },
  btnAddTask: {
    marginTop: "15px",
    backgroundColor: `${palette.red}`,
    color: `${palette.white}`,
    border: `1px solid ${palette.darkRed}`,
    fontSize: "22px",
    alignItems: "center",
  },
  errorsForm: {
    color: `${palette.white}`,
    textTransform: "uppercase",
  },
  errorInput: {
    border: `3px solid ${palette.danger}`,
  },
});
