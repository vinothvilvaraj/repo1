import DashView from './components/Dash.vue';
import SubStationDashView from './components/SubStationDash.vue';
import LoginView from './components/Login.vue';

// Import Views - Dash
import MainDashboardView from './components/views/MainDashboard.vue';
import CommDashboardView from './components/views/CommDashboard.vue';
import DataAvailDashboardView from './components/views/DataAvailDashboard.vue';
import DashboardGraphical from './components/views/DashboardGraphical.vue';
import OnDemandView from './components/views/OnDemand.vue';
import DeviceManagementView from './components/views/DeviceManagement.vue';
import UserManagementView from './components/views/UserManagement.vue';
import ImportFileView from './components/views/ImportFileManagement.vue';
import DiagView from './components/views/DiagManagement.vue';
import DataEditView from './components/views/DataEditManagement.vue';
import CdfUploadView from './components/views/ViewSSCDF.vue';
import SSDetailsPageView from './components/views/SSDetailsPage.vue';
import SSmanagementPageView from './components/views/SubStationManagement.vue';
import NotificationManagementPageView from './components/views/NotificationManagement.vue';
import ThresholdManagementPageView from './components/views/ThresholdManagement.vue';
import FirmwareManagementPageView from './components/views/FirmwareManagement.vue';
import AuditManagementPageView from './components/views/AuditManagement.vue';
import ReportsManagementPageView from './components/views/ReportsManagement.vue';

//import checkScreen from './components/views/checkScreen.vue';
//import checkScreen1 from './components/views/checkScreen1.vue'



// Routes

const routes = [{
        path: '/',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/tangedco',
        component: DashView,
        children: [{
                path: 'index',
                alias: '',
                component: MainDashboardView,
                name: 'Main Dashboard',
                meta: {
                    description: ''
                }
            },
            {
                path: 'communicationdashboard',
                alias: '',
                component: CommDashboardView,
                name: 'Connectivity Dashboard',
                meta: {
                    description: ''
                }
            },
            {
                path: 'dataavailabilitydashboard',
                alias: '',
                component: DataAvailDashboardView,
                name: 'Data Availability Dashboard',
                meta: {
                    description: ''
                }
            },
            {
                path: 'graphicaldashboard',
                alias: '',
                component: DashboardGraphical,
                name: 'Graphical Dashboard',
                meta: {
                    description: ''
                }
            },
            {
                path: 'ondemand',
                alias: '',
                component: OnDemandView,
                name: 'On Demand Commands',
                meta: {
                    description: ''
                }
            },
            {
                path: 'devicemanagement',
                alias: '',
                component: DeviceManagementView,
                name: 'DCU Management',
                meta: {
                    description: ''
                }
            },
            {
                path: 'usermanagement',
                alias: '',
                component: UserManagementView,
                name: 'User Management',
                meta: {
                    description: ''
                }
            },
            {
                path: 'notificationmanagement',
                alias: '',
                component: NotificationManagementPageView,
                name: 'Notification Management',
                meta: {
                    description: ''
                }
            },
            {
                path: 'thresholdmanagement',
                alias: '',
                component: ThresholdManagementPageView,
                name: 'Threshold Management',
                meta: {
                    description: ''
                }
            },
            {
                path: 'firmwaremanagement',
                alias: '',
                component: FirmwareManagementPageView,
                name: 'Firmware Management',
                meta: {
                    description: ''
                }
            },
            {
                path: 'auditview',
                alias: '',
                component: AuditManagementPageView,
                name: 'Audit Trail',
                meta: {
                    description: ''
                }
            }, {
                path: 'reportsview',
                alias: '',
                component: ReportsManagementPageView,
                name: 'Reports',
                meta: {
                    description: ''
                }
            },
            {
                path: 'diag',
                alias: '',
                component: DiagView,
                name: 'Diagnostic',
                meta: {
                    description: ''
                }
            }, {
                path: 'dataedit',
                alias: '',
                component: DataEditView,
                name: 'Edit Data',
                props: true,
                meta: {
                    description: ''
                }
            },
            {
                path: 'cdfupload',
                alias: '',
                component: CdfUploadView,
                name: 'View Sub Station Upload',
                meta: {
                    description: ''
                }
            },
            {
                path: 'ssdetailspage',
                alias: '',
                component: SSDetailsPageView,
                name: 'Sub Station Dashboard',
                props: true,
                meta: {
                    description: ''
                }
            },
            {
                path: 'ssmanagement',
                alias: '',
                component: SSmanagementPageView,
                name: 'Sub Station Management',
                meta: {
                    description: ''
                }
            },
        ]
    },
    {
        path: '/tangedco/substation',
        component: SubStationDashView,
        children: [{
            path: 'importfile',
            alias: '',
            component: ImportFileView,
            name: 'Upload to CDCS',
            meta: {
                description: 'Management'
            }
        }],
    }
];

export default routes;