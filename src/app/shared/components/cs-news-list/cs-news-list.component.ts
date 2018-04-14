import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedConstants } from '../../shared.constants';
import { CommonService } from './../../../core/common.service';


@Component({
    selector: 'cs-news-list',
    templateUrl: './cs-news-list.component.html',
    styleUrls: ['cs-news-list.component.scss']
})

export class CsNewsListComponent  {

    news = [
        {
            createDate: 'Jan 13 2018',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ex ratione dignissimos accusantium architecto dicta veniam officia, quis porro, consectetur eius, delectus tempore facilis iure ut. Aspernatur quibusdam omnis quaerat.',
            uri:'/detalle/noticia1'
        },
        {
            createDate: 'Jan 13 2018',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis porro quisquam est maxime veritatis quam, obcaecati deleniti deserunt at doloremque atque commodi repellendus officiis dolor accusamus tempore ab sit amet. Mollitia tenetur saepe dolore reiciendis vero obcaecati eligendi hic illo quae sint! Aut, ipsum numquam? Labore odio reprehenderit consequatur iure?',
            uri:'/detalle/noticia1'
        },
        {
            createDate: 'Jan 13 2018',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, labore.',
            uri:'/detalle/noticia1'
        },
    ]

    DEFAULT_BG_IMAGE: string = SharedConstants.PATHS.DEFAULT_BG_IMAGE;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor( ) { }
}