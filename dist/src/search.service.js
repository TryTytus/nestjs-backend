"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const meilisearch_1 = require("meilisearch");
let SearchService = class SearchService extends meilisearch_1.Meilisearch {
    constructor() {
        super({
            host: 'http://localhost:7700',
            apiKey: 'azx93WWgAJw1CsCIfvYB9DPc71FEo-gTRSUWvGCbhBA',
        });
    }
    async onModuleInit() {
        const index = this.index('movies');
        this.posts = this.index('posts');
        this.users = this.index('users');
        const documents = [
            { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
            { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
            { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
            {
                id: 4,
                title: 'Mad Max: Fury Road',
                genres: ['Adventure', 'Science Fiction'],
            },
            { id: 5, title: 'Moana', genres: ['Fantasy', 'Action'] },
            { id: 6, title: 'Philadelphia', genres: ['Drama'] },
        ];
        let response = await index.addDocuments(documents);
        console.log(response);
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SearchService);
//# sourceMappingURL=search.service.js.map