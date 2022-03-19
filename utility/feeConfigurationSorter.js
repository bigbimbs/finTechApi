function feeConfigurationSorter(datas) {
  function feeConfigurationSort(data) {
    const FEEID = `${data[0]}${data[1]}${data[2]}${data[3]}${data[4]}${data[5]}${data[6]}${data[7]}`;
    const FEECURRENCY = `${data[9]}${data[10]}${data[11]}`;
    const FEELOCALE =
      `${data[13]}` === "*"
        ? "ALL"
        : `${data[13]}${data[14]}${data[15]}${data[16]}` === "LOCL"
        ? "LOCL"
        : "INTL";
    const lastIndexOfFeeLocale = 14 + FEELOCALE.length;
    const FEEENTITY =
      `${data[lastIndexOfFeeLocale]}` === "*"
        ? "ALL"
        : `${data[lastIndexOfFeeLocale]}${data[lastIndexOfFeeLocale + 1]}${
            data[lastIndexOfFeeLocale + 2]
          }${data[lastIndexOfFeeLocale + 3]}${data[lastIndexOfFeeLocale + 4]}${
            data[lastIndexOfFeeLocale + 5]
          }${data[lastIndexOfFeeLocale + 6]}${data[lastIndexOfFeeLocale + 7]}${
            data[lastIndexOfFeeLocale + 8]
          }${data[lastIndexOfFeeLocale + 9]}${
            data[lastIndexOfFeeLocale + 10]
          }` === "CREDIT-CARD"
        ? "CREDIT-CARD"
        : `${data[lastIndexOfFeeLocale]}${data[lastIndexOfFeeLocale + 1]}${
            data[lastIndexOfFeeLocale + 2]
          }${data[lastIndexOfFeeLocale + 3]}${data[lastIndexOfFeeLocale + 4]}${
            data[lastIndexOfFeeLocale + 5]
          }${data[lastIndexOfFeeLocale + 6]}${data[lastIndexOfFeeLocale + 7]}${
            data[lastIndexOfFeeLocale + 8]
          }${data[lastIndexOfFeeLocale + 9]}` === "DEBIT-CARD"
        ? "DEBIT-CARD"
        : `${data[lastIndexOfFeeLocale]}${data[lastIndexOfFeeLocale + 1]}${
            data[lastIndexOfFeeLocale + 2]
          }${data[lastIndexOfFeeLocale + 3]}${data[lastIndexOfFeeLocale + 4]}${
            data[lastIndexOfFeeLocale + 5]
          }${data[lastIndexOfFeeLocale + 6]}${data[lastIndexOfFeeLocale + 7]}${
            data[lastIndexOfFeeLocale + 8]
          }${data[lastIndexOfFeeLocale + 9]}${data[lastIndexOfFeeLocale + 10]}${
            data[lastIndexOfFeeLocale + 11]
          }` === "BANK-ACCOUNT"
        ? "BANK-ACCOUNT"
        : "USSD";

    const startingIndexOfOpeningBracket = data.indexOf("(");
    const endingIndexOfOpeningBracket = data.indexOf(")");
    let ENTITYPROPERTY = "";
    for (
      i = startingIndexOfOpeningBracket + 1;
      i < endingIndexOfOpeningBracket;
      i++
    ) {
      ENTITYPROPERTY += data[i];
    }
    const lastIndexEntityProperty = endingIndexOfOpeningBracket + 10;
    const FEETYPE =
      `${data[lastIndexEntityProperty]}${data[lastIndexEntityProperty + 1]}${
        data[lastIndexEntityProperty + 2]
      }${data[lastIndexEntityProperty + 3]}` === "PERC"
        ? "PERC"
        : `${data[lastIndexEntityProperty]}${
            data[lastIndexEntityProperty + 1]
          }${data[lastIndexEntityProperty + 2]}${
            data[lastIndexEntityProperty + 3]
          }${data[lastIndexEntityProperty + 4]}${
            data[lastIndexEntityProperty + 5]
          }${data[lastIndexEntityProperty + 6]}${
            data[lastIndexEntityProperty + 7]
          }${data[lastIndexEntityProperty + 8]}` === "FLAT_PERC"
        ? "FLAT_PERC"
        : "FLAT";
    const lastIndexOfFeeType = lastIndexEntityProperty + FEETYPE.length + 1;
    let FEEVALUE = "";
    for (i = lastIndexOfFeeType; i < data.length; i++) {
      FEEVALUE += data[i];
    }

    const result = {
      FEEID: FEEID,
      FEECURRENCY: FEECURRENCY,
      FEELOCALE: FEELOCALE,
      FEEENTITY: FEEENTITY,
      ENTITYPROPERTY: ENTITYPROPERTY,
      FEETYPE: FEETYPE,
      FEEVALUE: FEEVALUE,
    };
    return result;
  }
  const finalResult = [];
  for (let i = 0; i < datas.length; i++) {
    finalResult.push(feeConfigurationSort(datas[i]));
  }
  return finalResult;
}

module.exports = feeConfigurationSorter;
