import React, { useEffect, useState } from "react";
import Todo from "components/Todo/Todo";
import LayoutWrapper from "components/LayoutWrapper/LayoutWrapper";
import HeaderPanel from "components/HeaderPanel/HeaderPanel";
import { useTranslation } from "react-i18next";
import { fetchTodos } from "store/todo/todoActions";
import { useDispatch } from "react-redux";
import Form from "components/Form/Form";
import CustomButton from "components/CustomButton/CustomButton";
import { Icons } from "constants/enums/Icons";
import { StyleSheet, css } from "aphrodite";
import { palette, typography, shadow } from "styles/index";

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState<boolean>(false);
  const btnAddTask = (
    <CustomButton
      label={t("add-task")}
      onClick={() => setShowForm(!showForm)}
      icon={{
        iconName: Icons.calendarPlus,
        color: `${palette.white}`,
      }}
      customStyles={styles.customBtnStyles}
    />
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <HeaderPanel actionButton={btnAddTask} />
      {showForm && <Form />}
      <div className={css(styles.tasksInformation)}>
        <h1 className={css(typography.logoFont, styles.tasksHeader)}>
          {t("active-tasks")}
        </h1>
        <p className={css(typography.normalFont, styles.tasksDate)}>
          21 Dec 2020
        </p>
      </div>
      <Todo />
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  customBtnStyles: {
    color: `${palette.white}`,
    background: `${palette.lightRed}`,
    border: `2px solid ${palette.darkRed}`,
    boxShadow: `${shadow}`,
  },
  tasksInformation: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "10px 0px",
    padding: "5px",
    backgroundColor: `${palette.darkBlueTwo}`,
    borderRadius: "5px",
    boxShadow: `${shadow}`,
  },
  tasksHeader: {
    color: `${palette.white}`,
    marginBottom: "-10px",
  },
  tasksDate: {
    textTransform: "uppercase",
    color: `${palette.white}`,
  },
});

export default HomeScreen;
