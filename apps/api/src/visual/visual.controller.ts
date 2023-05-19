import { Controller } from '@nestjs/common';
import { VisualService } from './visual.service';

@Controller()
export class VisualController {
  constructor(private readonly visualService: VisualService) {}
}
