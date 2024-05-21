import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';

@Controller('material')
export class MaterialController {

    @Get()
    getMaterials() {
        return 'Get all materials';
    }


}
