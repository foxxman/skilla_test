enum RESULTS_TYPES {
  IS_NEW = "is_new",
  MESSAGE = "message",
  ORDER = "order",
  PREORDER = "preorder",
}

enum STATUS_TYPES {
  SUCCESS = "Дозвонился",
  UNSUCESS = "Не дозвонился",
}

export enum CALL_TYPE {
  IN = 1,
  OUT = 0,
}

export interface ICall {
  id: number;
  partnership_id: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  date: Date;
  date_notime: Date;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: STATUS_TYPES;
  record: string;
  line_number: string;
  in_out: CALL_TYPE;
  from_site: number;
  source: string;
  errors: {
    title: string;
  }[];
  disconnect_reason: string;
  results: {
    type: RESULTS_TYPES;
    title: string;
    tooltip: string;
  }[];
  stages: [];
  abuse: {
    date: Date;
    person_name: string;
    message: string;
    support_read_status: number;
    support_answer_status: number;
    answers: {
      message: string;
      from_support: number;
      support_read_status: number;
      person_read_status: number;
    }[];
  };
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

