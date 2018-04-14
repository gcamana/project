import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedConstants } from '../../shared.constants';
import { CommonService } from './../../../core/common.service';


@Component({
    selector: 'cs-chat-list',
    templateUrl: './cs-chat-list.component.html',
    styleUrls: ['cs-chat-list.component.scss']
})

export class CsChatListComponent  {

    users = [
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'claudia.andrade',
            role: 'Secretaria',
            birthday: new Date(),
            connect: true
        },
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'martha.fernandez',
            role: 'Subdirector',
            birthday: new Date(),
            connect: true
        },
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'alexis.rios',
            role: 'Administrador',
            birthday: new Date(),
            connect: true
        },
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'saul.duarte',
            role: 'Director',
            birthday: new Date(),
            connect: false
        },
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'alexis.rios',
            role: 'Administrador',
            birthday: new Date(),
            connect: true
        },
        {
            profileImage: SharedConstants.PATHS.DEFAULT_BG_IMAGE,
            name: 'saul.duarte',
            role: 'Director',
            birthday: new Date(),
            connect: false
        },
    ]

    DEFAULT_BG_IMAGE: string = SharedConstants.PATHS.DEFAULT_BG_IMAGE;
    UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;

    constructor( ) { }

    
}