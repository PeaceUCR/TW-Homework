/**
 * Created by hea on 3/22/19.
 */


import agentsDataServiceModule from '../../src/service/agentsDataService';

describe('agentsDataServiceModule', () => {

    describe('agentsDataService', () => {
        let constantServiceMock;

        beforeEach(() => {
            let module = angular.mock.module;
            module(agentsDataServiceModule);

            constantServiceMock= {
                getAgentsContent: ()=>{
                    return [
                            {
                                url: 'bjstdmngbgr02.thoughtworks.com',
                                status: 'idle',
                                ip: '192.168.1.2',
                                path:'/var/lib/cruise-agent',
                                resources: ['ubuntu', 'firefox3', 'core-duo'],
                                category: 'Physical'
                            }];
                }
            };

            module(function ($provide) {
                $provide.value('constantService', constantServiceMock);
            });

        });

        it('should return value from mock dependency', inject(function (agentsDataService) {
            expect(agentsDataService.agentsData).toEqual(constantServiceMock.getAgentsContent());
        }));

        it('should add/delete resources and history working', inject(function (agentsDataService) {
            let dataIndex = 0;
            let resourcesAdd = 'chrome, ie11';
            let array = resourcesAdd.split(',');
            agentsDataService.addResources(dataIndex, resourcesAdd);
            expect(agentsDataService.agentsData[dataIndex].resources).toContain(array[0].trim());
            expect(agentsDataService.agentsData[dataIndex].resources).toContain(array[1].trim());

            let resourceIndex = 0;
            agentsDataService.deleteResources(dataIndex, resourceIndex);
            expect(agentsDataService.agentsData[dataIndex].resources).not.toContain('ubuntu');

        }));

        it('should getSummary works', inject(function (agentsDataService) {
            expect(agentsDataService.getSummary()).toEqual({'idle': 1});
        }));
    });
});
