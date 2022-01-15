import { Fragment, useState } from "react";
// import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);
  // const { i18n } = useTranslation();

  const language = [
    {
      code: "ru",
      name: "Русский",
      country_code: "ru",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
  ];

  return (
    // <Fragment>
    //   <Button
    //     sx={{ marginLeft: "15px" }}
    //     variant="outlined"
    //     color="primary"
    //     onClick={(e) => setMenuAnchor(e.currentTarget)}
    //     endIcon={<Translate />}
    //   >
    //     {/* <span>{language[i18n.language]}</span> */}
    //     {language.map((item) => (
    //       <span key={item.code}>
    //         {item.code === i18n.language && item.name}
    //       </span>
    //     ))}
    //   </Button>
    //   <Menu
    //     anchorEl={menuAnchor}
    //     open={!!menuAnchor}
    //     onClose={() => setMenuAnchor(null)}
    //   >
    //     {language.map((item) => (
    //       <MenuItem
    //         key={item.code}
    //         onClick={() => {
    //           i18n.changeLanguage(item.code);
    //           setMenuAnchor(null);
    //         }}
    //       >
    //         {item.name}
    //       </MenuItem>
    //     ))}
    //   </Menu>
    // </Fragment>
    <h1>asd</h1>
  );
};

export default LanguageSelect;
