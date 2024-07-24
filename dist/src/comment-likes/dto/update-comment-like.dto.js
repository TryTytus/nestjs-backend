"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentLikeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_comment_like_dto_1 = require("./create-comment-like.dto");
class UpdateCommentLikeDto extends (0, swagger_1.PartialType)(create_comment_like_dto_1.CreateCommentLikeDto) {
}
exports.UpdateCommentLikeDto = UpdateCommentLikeDto;
//# sourceMappingURL=update-comment-like.dto.js.map