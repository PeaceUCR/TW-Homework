/**
 * Created by hea on 3/21/19.
 */

const MODULE_NAME = 'agentsDataServiceModule';

angular.module(MODULE_NAME,['constantServiceModule']).factory('agentsDataService', ['constantService',(constantService) => {

    let agentsData = angular.copy(constantService.getAgentsContent());

    let historyList = [];

    return {
        agentsData: agentsData,
        addResources: (dataIndex, resources)=>{
            let array = resources.split(",");
            array.forEach((item)=>{
                if(item){
                    agentsData[dataIndex].resources.push(item.trim());
                }
            });
            historyList.unshift(agentsData[dataIndex].url);
        },
        deleteResource: (dataIndex, resourceIndex)=>{
            agentsData[dataIndex].resources.splice(resourceIndex, 1);
            historyList.unshift(agentsData[dataIndex].url);
        },
        getSummary:()=>{
            let summary = {};

            if(agentsData){
                agentsData.forEach((item)=>{
                    if(summary.hasOwnProperty(item.status)){
                        summary[item.status]++;
                    }else{
                        summary[item.status] = 1;
                    }
                });
            }

            return summary;
        },
        getHistory:()=>{
            return historyList;
        }
    }
}]);

export default MODULE_NAME;