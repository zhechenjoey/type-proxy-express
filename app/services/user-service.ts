import { Service } from 'typedi';
import { BaseService } from '../base/base-service';

@Service()
export class UserService extends BaseService {
    testRedis() {
        return 'fake';
    }
}