// ---------- Common Annotations File for Schema ----------

using {
    com.aleron.monitor.record as record,
    com.aleron.monitor.Files as Files,
    com.aleron.monitor.FileStatus as FileStatus,
    com.aleron.monitor.InterfaceTypes as InterfaceTypes,
    com.aleron.monitor.TripStatusList as TripStatusList,
} from './schema';


// ----------- Common annotations ---------------------------

// annotate record with {
//     valid @readonly;
// };

annotate Files with {
    ID @Common: {
        Text           : name,
        TextArrangement: #TextLast,
    };
};

annotate FileStatus {
    code @Common: {
        Text           : name,
        TextArrangement: #TextOnly,
    };
};

annotate InterfaceTypes {
    @Common: {
        Text           : name,
        TextArrangement: #TextOnly,
    }
    ID;
};

annotate TripStatusList {
    code @Common: {
        Text           : name,
        TextArrangement: #TextOnly,
    };
};

// ----------- UI annotations -----------------------------

annotate Files with {
    createdAt @UI.HiddenFilter: false;
    createdBy @UI.HiddenFilter: false;
    modifiedAt @UI.HiddenFilter:false;
    modifiedBy @UI.HiddenFilter:false;
};

annotate record with {
    file        @UI.Hidden;
    criticality @UI.Hidden;
};
