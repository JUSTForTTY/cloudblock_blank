import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {GridOptions} from "ag-grid";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sucu01-data0010002',
  templateUrl: './sucu01-data0010002.component.html',
})
export class Sucu01Data0010002Component implements OnInit {
    private gridApi;
    private gridColumnApi;
    private columnDefs;
    private gridOptions: GridOptions;
    private defaultColDef;
    constructor(
        private http: _HttpClient
    ) { 
        this.columnDefs = [
            {
              headerName: "运动员",
              field: "athlete",
              width: 150
            },
            {
              headerName: "金牌",
              field: "gold",
              width: 100
              
            },
            {
              headerName: "年龄",
              field: "age",
              width: 90
              
            },
            {
              headerName: "国家",
              field: "country",
              width: 120
            },
            {
              headerName: "组别",
              valueGetter: "data.country.charAt(0)",
              width: 120
            },
            {
              headerName: "年份",
              field: "year",
              width: 90
            },
            {
              headerName: "时间",
              field: "date",
              width: 110
            },
            {
              headerName: "项目",
              field: "sport",
              width: 110
            },
            
            {
              headerName: "银牌",
              field: "silver",
              width: 100
            },
            {
              headerName: "铜牌",
              field: "bronze",
              width: 100
            },
            {
              headerName: "总数",
              field: "total",
              width: 100
              
            }
          ];

          this.defaultColDef = {
            enableValue: true,
            enableRowGroup: true,
            enablePivot: true
          };

        }

        ngOnInit() {
        
        
        }
    
        //http获取数据
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            this.http
              .get("assets/ngtable.json")
              .subscribe((data:any[]) => {
                params.api.setRowData(data.slice(0, 500));
              });
          }



   

    //国际化
    localeText = {

        // for filter panel
        page: '页',
        more: '更多',
        to: '至',
        of: '共',
        next: '下一个',
        last: '最后一个',
        first: '第一个',
        previous: 'daPreviousen',
        loadingOoo: 'daLoading...',

        // for set filter
        selectAll: '选择所有',
        searchOoo: '搜索...',
        blanks: 'daBlanc',

        // for number filter and text filter
        filterOoo: '搜索...',
        applyFilter: 'daApplyFilter...',

        // for number filter
        equals: 'daEquals',
        lessThan: 'daLessThan',
        greaterThan: 'daGreaterThan',

        // for text filter
        contains: 'daContains',
        startsWith: 'daStarts dawith',
        endsWith: 'daEnds dawith',

        // the header of the default group column
        group: '分组',

        // tool panel
        columns: '工具面板',
        rowGroupColumns: '行分组列',
        rowGroupColumnsEmptyMessage: '拖动此处进行分组',
        valueColumns: '列值',
        pivotMode: '枢轴模式',
        groups: '分组',
        values: '数值',
        pivots: '枢轴',
        valueColumnsEmptyMessage: '拖动此处进行聚合',
        pivotColumnsEmptyMessage: '拖动此处设置标签',
        toolPanelButton: '工具面板',

        // other
        noRowsToShow: '无数据',

        // enterprise menu
        pinColumn: '固定列',
        valueAggregation: 'laValue Agg',
        autosizeThiscolumn: '调整此列宽',
        autosizeAllColumns: '调整所有列宽',
        groupBy: '作为分组 把',
        ungroupBy: '取消分组 把',
        resetColumns: '重置列',
        expandAll: '展开所有分组',
        collapseAll: '收起所有分组',
        toolPanel: '工具面板',
        export: '导出',
        csvExport: '导出到CSV',
        excelExport: '导出到Excel',

        // enterprise menu pinning
        pinLeft: '固定到左 <<',
        pinRight: '固定到右 >>',
        noPin: '取消固定 <>',

        // enterprise menu aggregation and status panel
        sum: '和',
        min: '最小值',
        max: '最大值',
        none: '无',
        count: '数量',
        average: '平均值',

        // standard menu
        copy: '复制',
        copyWithHeaders: '复制(带列头)',
        ctrlC: 'ctrl + C',
        paste: '粘贴',
        ctrlV: 'ctrl + V'
}

}
